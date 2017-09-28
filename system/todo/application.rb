require "kanji/application"
require "rack/cors"
require "schema"
require_relative "container"

module Todo
  class Application < Kanji::Application
    configure do |config|
      config.container = Container

      use Rack::Cors do
        allow do
          origins '*'
          resource '*', headers: :any, methods: [:get, :post, :options]
        end
      end
    end

    route do |r|
      r.is "graphiql" do
        render "graphiql.html"
      end

      r.post "api" do
        r.resolve "graph.query" do |query|
          payload = JSON.parse(request.body.read)
          result = query.call(
            schema: Todo::Schema,
            query: payload["query"],
            variables: payload["variables"],
            context: {}
          )
          result.to_json
        end
      end
    end

    error do |e|
      self.class[:rack_monitor].instrument(:error, exception: e)
      raise e
    end

  end
end
