
import os
import glob
import hashlib
import datetime
from fabric.api import local, put


def _name(filename):
    now = datetime.datetime.now()

    with open(filename) as f:
        hsh = hashlib.md5(f.read()).hexdigest()[:6]

    name = '%s.%s' % (now.strftime('%Y%m%d'), hsh)
    return name + os.path.splitext(filename)[1]


def upload_qiniu(filename):
    name = _name(filename)
    local('qboxrsctl put -c python qingcheng/%s %s' % (name, filename))


def upload():
    upload_qiniu('dist/qingcheng.js')
    upload_qiniu('dist/qingcheng.css')


def js():
    # debug js
    filename = 'dist/qingcheng.js'
    name = _name(filename)
    put(filename, '/var/zerqu/public/assets/%s' % name)


def fonts():
    for name in glob.glob('dist/fonts/*'):
        key = name.replace('dist', 'qingcheng')
        local('qboxrsctl put -c python %s %s' % (key, name))
