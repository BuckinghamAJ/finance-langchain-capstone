package db

import (
	"database/sql"
	"errors"
	"fmt"
	"os"
	"path/filepath"

	"github.com/BuckinghamAJ/solidjs-wails-template/migrations"
	"github.com/mattn/go-sqlite3"
)

func fileExists(path string) bool {
	_, err := os.Stat(path)

	return err == nil || !errors.Is(err, os.ErrNotExist)
}

func AppDbPath(appName string, fileName string) (string, error) {
	configDir, err := os.UserConfigDir()
	if err != nil {
		return "", fmt.Errorf("get user config dir: %w", err)
	}

	return filepath.Join(configDir, appName, fileName), nil
}

func OpenAppDatabase(appName string, fileName string, runMigrations bool) (*sql.DB, error) {
	dbPath, err := AppDbPath(appName, fileName)
	if err != nil {
		return nil, err
	}

	return Open(dbPath, runMigrations)
}

func Open(path string, runMigrations bool) (*sql.DB, error) {
	if exists := fileExists(path); !exists {
		if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
			return nil, fmt.Errorf("create db directory: %w", err)
		}

		f, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0o644)
		if err != nil {
			if !errors.Is(err, os.ErrExist) {
				return nil, fmt.Errorf("create db file: %w", err)
			}
		} else {
			if err := f.Close(); err != nil {
				return nil, fmt.Errorf("close created db file: %w", err)
			}
		}
	}

	db, err := sql.Open("sqlite3", path)
	if err != nil {
		return nil, fmt.Errorf("open sqlite database: %w", err)
	}

	if err := configure(db); err != nil {
		_ = db.Close()
		return nil, err
	}

	if runMigrations {
		if err := migrations.Run(db); err != nil {
			_ = db.Close()
			return nil, fmt.Errorf("run migrations: %w", err)
		}
	}

	return db, nil
}

func configure(db *sql.DB) error {
	pragmas := []string{
		"PRAGMA foreign_keys = ON;",
		"PRAGMA journal_mode = WAL;",
		"PRAGMA busy_timeout = 5000;",
	}

	for _, pragma := range pragmas {
		if _, err := db.Exec(pragma); err != nil {
			return fmt.Errorf("apply %s: %w", pragma, err)
		}
	}

	return nil
}

func IsBusy(db *sql.DB) bool {
	_, err := db.Exec("SELECT 1;")
	if sqliteErr, ok := err.(sqlite3.Error); ok {
		if sqliteErr.Code == sqlite3.ErrBusy {
			return true
		}
	}

	return false
}
