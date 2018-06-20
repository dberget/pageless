build-release:
	echo "Make sure you bumped the version in mix.exs"
	$(eval VERSION := $(shell sed -n '/version:/s/ *version: "\(.*\)",/\1/p' mix.exs))
	sleep 3
	mix deps.get
	cd assets && ./node_modules/webpack/bin/webpack.js -p
	MIX_ENV=prod mix phx.digest
	docker run -it -v `pwd`:/src --rm --workdir /src -e MIX_ENV=prod erlang-builder mix do deps.clean comeonin, deps.get, compile, release --env=prod

release:
	$(eval VERSION := $(shell sed -n '/version:/s/ *version: "\(.*\)",/\1/p' mix.exs))
	ssh root@45.55.254.134 "mkdir /pageless_new"
	scp _build/prod/rel/pageless/releases/$(VERSION)/pageless.tar.gz root@45.55.254.134:/pageless_new/
	ssh root@45.55.254.134 "cd /var/www/pageless && ./bin/pageless stop"
	ssh root@45.55.254.134 "mv /var/www/pageless /pageless_old"
	ssh root@45.55.254.134 "mv /pageless_new /var/www/pageless"
	ssh root@45.55.254.134 "cd /var/www/pageless && tar xzf pageless.tar.gz"
	ssh root@45.55.254.134 "cd /var/www/pageless && PORT=5000 ./bin/pageless start"
	ssh root@45.55.254.134 "rm -rf /pageless_old"

builder:
	cd docker && docker build -t erlang-builder .
