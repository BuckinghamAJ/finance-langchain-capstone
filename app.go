package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/BuckinghamAJ/finance-langchain-capstone/internal/db"
	"github.com/BuckinghamAJ/finance-langchain-capstone/internal/store"
)

type App struct {
	ctx     context.Context
	db      *sql.DB
	queries *store.Queries
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	database, err := db.OpenAppDatabase("solidjs-wails-template", "app.db", true)
	if err != nil {
		log.Fatal("unable to open app database: ", err)
	}

	a.db = database
	a.queries = store.New(database)
}

func (a *App) domReady(ctx context.Context) {
}

func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

func (a *App) shutdown(ctx context.Context) {
	if a.db == nil {
		return
	}

	if err := a.db.Close(); err != nil {
		log.Println("unable to close database:", err)
	}
}

func (a *App) Greet(name string) string {
	if name == "" {
		name = "friend"
	}

	return fmt.Sprintf("Hello, %s! Your Wails bridge is ready.", name)
}

func (a *App) CreateItem(name string) (store.Item, error) {
	return a.queries.CreateItem(a.ctx, name)
}

func (a *App) ListItems() ([]store.Item, error) {
	return a.queries.ListItems(a.ctx)
}

func (a *App) DeleteItem(id int64) error {
	return a.queries.DeleteItem(a.ctx, id)
}
