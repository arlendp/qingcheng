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
	@cat icon.css build/style.css vendors/*.css | cleancss -o dist/qingcheng.css
	@cp fonts/* dist/fonts/
	@cp build/vendor.js dist/
	@cp build/qingcheng.js dist/
	@cp build/qingcheng.js.map dist/

upload:
	@fab upload_assets

deploy: dist upload


.PHONY: build copy dist deploy
