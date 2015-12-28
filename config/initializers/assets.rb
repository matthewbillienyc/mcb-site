# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( master.css nav.js )
Rails.application.config.assets.precompile += %w( artistdata/artist.js artistdata/build-chart.js artistdata/data-miner.js artistdata/spotify-chart.js artistdata/artistdata.css d3.v3.js jquery.min.js )
Rails.application.config.assets.precompile += %w( counterpoint/counterpoint.js counterpoint/counterpoint.css )
Rails.application.config.assets.precompile += %w( doubletheremin/doubletheremin.js doubletheremin/doubletheremin.css )
Rails.application.config.assets.precompile += %w( tonebox/tonebox.css tonebox/tonebox.js )
