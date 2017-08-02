require 'rack/jekyll'
require 'rack/rewrite'
require 'rack/ssl-enforcer'
require 'rack/canonical_host'
require 'yaml'

if ENV['CANONICAL_HOST_URL'].present?
  use Rack::CanonicalHost, URI(ENV["CANONICAL_HOST_URL"]).host
elsif ENV['CANONICAL_HOST'].present?
  use Rack::CanonicalHost, ENV["CANONICAL_HOST"]
end

run Rack::Jekyll.new
