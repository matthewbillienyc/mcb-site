# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( nav.js jquery.min.js d3.v3.js tonebox/tonebox.js doubletheremin/doubletheremin.js counterpoint/counterpoint.js artistdata/artistdata.js artistdata/artist.js artistdata/build-chart.js artistdata/data-miner.js artistdata/spotify-chart.js artistdata/artistdata.css counterpoint/counterpoint.css doubletheremin/doubletheremin.css tonebox/tonebox.css master.css )
