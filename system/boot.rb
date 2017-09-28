begin
  require "pry-byebug"
rescue LoadError
end

require_relative "todo/container"

Todo::Container.start :rom
Todo::Container.start :graph
Todo::Container.start :repos
Todo::Container.finalize!

require "todo/application"
