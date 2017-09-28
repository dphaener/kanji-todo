require "kanji/type"

module Types
  class User < Kanji::Type
    name "User"
    description "Replace this description with something useful"

    attribute :email, Kanji::Types::String, "Replace this description"
    attribute :name, Kanji::Types::String, "Replace this description"

    register :repo, Todo::Container["repos.users"]

    create do |object, arguments, context|
      resolve(:repo).create(arguments.to_h)
    end

    update do |object, arguments, context|
      resolve(:repo).update(arguments.to_h)
    end

    destroy do |object, arguments, context|
      resolve(:repo).destroy(arguments[:id])
    end
  end
end
