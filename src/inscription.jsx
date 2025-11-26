import './assets/css/inscription.css'
import parking from './assets/parking.jpg'

function Inscription() {
    return (
        <>
            <div className="page-container">
                <div className="image-side">
                    <img src={parking} alt="Image" />
                </div>

                <div className="form-side">
                    <h2>Inscription</h2>

                    <form className="inscription-form">

                        <div className="row">
                            <div className="field">
                                <label>Prénom</label>
                                <input type="text" />
                            </div>
                            <div className="field">
                                <label>Nom</label>
                                <input type="text" />
                            </div>
                        </div>

                        <div className="field">
                            <label>Adresse</label>
                            <input type="text" />
                        </div>

                        <div className="row">
                            <div className="field">
                                <label>Ville</label>
                                <input type="text" />
                            </div>
                            <div className="field">
                                <label>Code postal</label>
                                <input type="text" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="field">
                                <label>Email</label>
                                <input type="email" />
                            </div>
                            <div className="field">
                                <label>Mot de passe</label>
                                <input type="password" />
                            </div>
                        </div>

                        <button type="submit">S’inscrire</button>

                        <p className="login-text">
                            Déjà inscrit ? <a href="#">Se connecter</a>
                        </p>

                        <p className="legal">
                            * En vous inscrivant, vous acceptez nos <a href="#">Conditions d’utilisation</a> et reconnaissez avoir lu notre <a href="#">Politique de confidentialité</a>.
                        </p>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Inscription
