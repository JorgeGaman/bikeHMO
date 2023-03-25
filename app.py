from flask import Flask, render_template, request, session, redirect, url_for

app = Flask(__name__)
app.secret_key = "pruebas3312"

# Lista de correos registrados (sólo para fines de demostración)
users = {"jorge@gmail.com": "12345"}
bikes = {
    "sencilla1": True,
    "sencilla2": True,
    "sencilla3": True,
    "sencilla4": True,
    "sencilla5": True,
}

# Ruta principal, requiere inicio de sesión
@app.route("/")
def index():
    if "email" in session:
        return render_template("index.html", email=session["email"], bikes=bikes)
    return redirect(url_for("login"))


# Página de inicio de sesión
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        if email in users and users[email] == password:
            print("Inicio de sesión correcto")
            session["email"] = email
            return redirect(url_for("index"))
        else:
            return render_template(
                "login.html", error="correo o contraseña incorrectos"
            )
    return render_template("login.html")


# Página de cierre de sesión
@app.route("/logout")
def logout():
    session.pop("email", None)
    return redirect(url_for("index"))


# Página de renta de bicicletas, requiere inicio de sesión
@app.route("/renta", methods=["GET", "POST"])
def renta():
    if "email" in session:
        if request.method == "POST":
            # Procesamiento de la renta de bicicletas
            return render_template(
                "renta.html",
                email=session["email"],
                message="Renta procesada correctamente",
            )
        return render_template("renta.html", email=session["email"])
    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(debug=True)
