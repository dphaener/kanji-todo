require "kanji/web_container"

module Todo
  class Container < Kanji::WebContainer
    configure do
      config.name = :todo
      config.listeners = true
      config.auto_register = %w[app]
    end

    load_paths! "app"
  end
end
