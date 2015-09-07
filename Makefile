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
	@node_modules/.bin/webpack
	@cat icon.css build/style.css | cleancss -o dist/qingcheng.css
	@cp fonts/* dist/fonts/
	@uglifyjs build/qingcheng.js -m -o dist/qingcheng.js

upload: dist
	@fab upload_assets

.PHONY: build copy dist
