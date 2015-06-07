#encoding: utf-8
require 'rubygems'
require 'sinatra'
require 'mysql'
require 'digest'
set :port, 3000
set :sessions, true

get '/login' do
    erb :login_form
end
get '/publicar' do
	erb :formulario
end

post '/publicar' do
	item = params[:item]
	price = params[:price]
	shipping = params[:shipping]
	seller = params[:seller]
	stock = params[:stock]
	begin
		conexion = Mysql.new 'localhost', 'flv', 'flv123', 'test'
		query_publicar = conexion.query "INSERT INTO productos(Item,Price,Shipping,Seller,Stock) VALUES(\'#{item}\',#{price},\'#{shipping}\',\'#{seller}\',#{stock})"
	rescue Mysql::Error => e
		puts e.error
	ensure
		conexion.close if conexion
	end
end


post '/login' do
	name = params[:email]
	psw = params[:password]
	md5 = Digest::MD5.hexdigest(psw)
	begin  
	    connection = Mysql.new 'localhost', 'flv', 'flv123', 'test'
	    query_login = connection.query "SELECT * FROM users WHERE email = \'#{name}\' AND password = \'#{psw}\'"
		if query_login.num_rows == 1  
			session[:signed_in] = true
		    "SUCCESS! :)"
		elsif query_login.num_rows > 1  
		    "ERROR - Internal error, please contact webmaster."
		else  
		    "ERROR - Invalid username and / or password."
		end
	rescue Mysql::Error => e
	    puts e.error
	ensure
	    connection.close if connection
	end

end
get '/private' do  
    unless session[:signed_in] == true
        halt 401, "GO AWAY C:"
    else
        "You're welcome :D"
    end
end
get '/logout' do
    session[:signed_in] = false
    "SUCCESS! :)"
end