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
	@NODE_ENV=production node_modules/.bin/webpack --optimize-dedupe --optimize-minimize
	@cat icon.css vendors/*.css | cleancss -o dist/vendor.css
	@cp fonts/* dist/fonts/
	@cp build/app.css dist/
	@cp build/vendor.js dist/
	@cp build/app.js dist/
	@cp build/app.js.map dist/

upload:
	@fab upload_assets

deploy: dist upload


.PHONY: build copy dist deploy
