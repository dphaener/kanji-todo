Todo::Container.finalize :settings do |container|
  init do
    require "todo/settings"
  end

  start do
    settings = Todo::Settings.load(container.config.root, container.config.env)
    container.register :settings, settings
  end
end
