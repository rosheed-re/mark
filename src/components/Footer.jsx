export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__row">
                <div>
                    <p className="footer__brand">True Mark</p>
                    <p className="footer__tagline">Custom tattoos. Drawn true.</p>
                </div>
                <div>
                    <p className="eyebrow">Hours</p>
                    <p>Tue – Sat · 11:00 – 19:00</p>
                    <p>Sun – Mon · Closed</p>
                </div>
                <div>
                    <p className="eyebrow">Find us</p>
                    <p>204 Anchor Row, Unit 3</p>
                    <p>hello@truemark.studio</p>
                </div>
            </div>
            <p className="footer__legal">© {new Date().getFullYear()} True Mark Tattoo Studio. All marks final.</p>
        </footer>
    )
}