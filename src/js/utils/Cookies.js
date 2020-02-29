import "cookieconsent";

const cookieConsent = () => {
  window.cookieconsent.initialise({
    container: document.getElementById("content"),
    palette: {
      popup: { background: "#fff" },
      button: { background: "#001e36" }
    },
    revokable: true,
    onStatusChange: function(status) {
      console.log(this.hasConsented() ? "enable cookies" : "disable cookies");
    },
    law: {
      regionalLaw: false
    },
    location: true,
    content: {
      header: "Cookies used on the website!",
      message: "This website uses cookies to improve your experience.",
      dismiss: "Got it!",
      allow: "Allow cookies",
      deny: "Decline",
      link: "Learn more",
      href: "/it/privacy",
      close: "&#x274c;",
      policy: "Cookie Policy",
      target: "_blank"
    },
    position: "bottom-left"
  });
};

export default cookieConsent;
