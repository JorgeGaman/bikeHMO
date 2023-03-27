from flask import Flask, render_template, request, session, redirect, url_for
import random

app = Flask(__name__)
app.secret_key = "pruebas3312"

# Lista de correos registrados (sólo para fines de demostración)
users = {"jorge@gmail.com": "12345"}
bikes = {
    "BCN": {
        "tipo": "Bicicleta niño",
        "precio": 40,
    },
    "BCA": {
        "tipo": "Bicicleta adulto",
        "precio": 60,
    },
    "BCD": {
        "tipo": "Bicicleta doble",
        "precio": 80,
    },
}


# Ruta principal, requiere inicio de sesión
@app.route("/")
def index():
    return render_template("index.html", bikes=bikes, folio=folio)


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


# generame un numero random de 4 digitos
folio = random.randint(1000, 9999)


# Página de renta de bicicletas, requiere inicio de sesión
@app.route("/confirmar-renta", methods=["GET", "POST"])
def renta():
    if "email" in session:
        if request.method == "POST":
            # Procesamiento de la renta de bicicletas
            return render_template(
                "renta.html",
                email=session["email"],
                message="Renta procesada correctamente",
                folio=folio,
            )
        return render_template("renta.html", email=session["email"], folio=folio)
    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(debug=True)
