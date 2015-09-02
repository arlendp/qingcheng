copy:
	@mkdir -p build/fonts
	@cp fonts/* build/fonts/
	@cp icon.css build/

build: copy
	@node_modules/.bin/webpack

dist:
	@mkdir -p dist/fonts
	@PRODUCTION=1 node_modules/.bin/webpack
	@cat icon.css build/style.css | cleancss -o dist/qingcheng.css
	@cp fonts/* dist/fonts/
	@mv build/qingcheng.js dist/
	@mv build/qingcheng.js.map dist/

upload: dist
	@fab upload_assets
	@fab upload_js -H pythonchina-web-0

.PHONY: build copy dist
