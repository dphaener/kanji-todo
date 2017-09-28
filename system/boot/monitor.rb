require "dry/monitor"

Todo::Container.finalize :monitor do |_container|
  start do
    Dry::Monitor::SQL::Logger.new(logger).subscribe(notifications)

    if settings[:env] == "development"
      Dry::Monitor::SQL::Logger.new(stdout_logger).subscribe(notifications)
    end
  end
end
