copy:
	@mkdir -p build/fonts
	@cp fonts/* build/fonts/
	@cp icon.css build/

build: copy
	@node_modules/.bin/webpack

dev:
	@DEV_MODE=1 node server.js

dist:
	@mkdir -p dist/fonts
	@PRODUCTION=1 node_modules/.bin/webpack
	@cat icon.css build/style.css vendors/*.css | cleancss -o dist/qingcheng.css
	@cp fonts/* dist/fonts/
	@cp build/qingcheng.js dist/
	@cp build/qingcheng.js.map dist/

upload: dist
	@fab upload_assets

.PHONY: build copy dist
