package main

import (
	"embed"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed frontend/dist
var assets embed.FS

//go:embed assets/appicon.png
var icon []byte

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	app := NewApp()

	err := wails.Run(&options.App{
		Title:             "SolidJS Wails Template",
		Width:             1100,
		Height:            760,
		MinWidth:          900,
		MinHeight:         640,
		DisableResize:     false,
		Fullscreen:        false,
		Frameless:         false,
		StartHidden:       false,
		HideWindowOnClose: false,
		BackgroundColour:  &options.RGBA{R: 255, G: 255, B: 255, A: 255},
		Assets:            assets,
		Menu:              nil,
		Logger:            nil,
		LogLevel:          logger.DEBUG,
		OnStartup:         app.startup,
		OnDomReady:        app.domReady,
		OnBeforeClose:     app.beforeClose,
		OnShutdown:        app.shutdown,
		WindowStartState:  options.Normal,
		// The Bind option is one of the most important options in a Wails application.
		// It specifies which struct methods to expose to the frontend.
		// Think of structs like "controllers" in a traditional web application.
		// When the application starts, it examines the struct instances listed in
		// the Bind field in the options, determines which methods are public
		// (starts with an uppercase letter) and
		// will generate JavaScript versions of those methods that
		// can be called by the frontend code.
		Bind: []any{
			app,
		},
		// Windows platform specific options
		Windows: &windows.Options{
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			DisableWindowIcon:    true,
			// DisableFramelessWindowDecorations: false,
			WebviewUserDataPath: "",
			Theme:               windows.Dark,
		},
		// Mac platform specific options
		Mac: &mac.Options{
			TitleBar: &mac.TitleBar{
				TitlebarAppearsTransparent: false,
				HideTitle:                  false,
				HideTitleBar:               false,
				FullSizeContent:            false,
				UseToolbar:                 false,
				HideToolbarSeparator:       true,
			},
			Appearance:           mac.NSAppearanceNameDarkAqua,
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			About: &mac.AboutInfo{
				Title:   "SolidJS Wails Template",
				Message: "A SolidJS, Tailwind, Go, Wails, SQLite, goose, and sqlc starter.",
				Icon:    icon,
			},
		},
		Linux: &linux.Options{
			Icon:                icon,
			WindowIsTranslucent: true,
			WebviewGpuPolicy:    linux.WebviewGpuPolicyAlways,
			ProgramName:         "solidjs-wails-template",
		},
		Debug: options.Debug{
			OpenInspectorOnStartup: false,
		},
	})

	if err != nil {
		log.Fatal(err)
	}
}
