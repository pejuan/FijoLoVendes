#encoding: utf-8
require 'rubygems'
require 'sinatra'
require 'mysql'
require 'mysql2xxxx'
require 'digest'
set :port, 3000
set :sessions, true

id = 0
get '/login' do
    erb :login_form
end
get '/publicar' do
	posts = Mysql2xxxx::JSON.new :user => 'flv', :password => 'flv123', :database => 'test', :execute => 'Select * from productos'
	posts.to_s
end


post '/publicar' do
	unless session[:signed_in] == false	
	
		item = params[:item]
		price = params[:price]
		shipping = params[:shipping]
		seller = params[:seller]
		stock = params[:stock]
		begin
			conexion = Mysql.new 'localhost', 'flv', 'flv123', 'test'
			query_publicar = conexion.query "INSERT INTO productos(Item,Price,Shipping,Seller,Stock,users_id) VALUES(\'#{item}\',#{price},\'#{shipping}\',\'#{seller}\',#{stock},#{id})"
		rescue Mysql::Error => e
			puts e.error
		ensure
			conexion.close if conexion
		end
	else
		"Not possible unless signed in!"

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
			query_id = connection.query "SELECT ID FROM users WHERE email = \'#{name}\'"
			id = query_id.fetch_row[0]
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
post '/signup' do
	nom = params[:nombre]
	apellido = params[:apellido]
	correo = params[:correo]
	psw1 = params[:pass]
	psw2 = params[:pass2]
	if psw1 == psw2
		con = Mysql.new 'localhost', 'flv', 'flv123', 'test'
		query_signup1 = con.query "SELECT * FROM users WHERE email = \'#{correo}\'"
		if query_signup1.num_rows < 1
			query_signupfinal = con.query "INSERT INTO users(Nombre,Apellido,email,password) VALUES(\'#{nom}\',\'#{apellido}\',\'#{correo}\',\'#{psw1})\')"
 		else
 			"Ya existe un usuario con esa direccion de correo."
		end
	else
		"Contraseñas no concuerdan"
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
    id = 0
    "SUCCESS! :)"
end