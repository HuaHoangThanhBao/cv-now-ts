import { useGoogleLogin } from 'src/hooks'
import LogoColor from '../../assets/landing-page/logo-color.png'
import Logo from '../../assets/landing-page/logo.png'
import Medal from '../../assets/landing-page/medal.png'
import HeroImg from '../../assets/landing-page/Vector Smart Object.png'
import FeatureBannerImg from '../../assets/landing-page/Vector Smart Object 2.png'
import SpeedImg from '../../assets/landing-page/speed.png'
import PrototypeImg from '../../assets/landing-page/prototyping.png'
import VectorImg from '../../assets/landing-page/vector.png'
import BillImg from '../../assets/landing-page/bill.png'
import NetworkImg from '../../assets/landing-page/network.png'
import BadgeImg from '../../assets/landing-page/badge.png'
import IntegrationImg from '../../assets/landing-page/Vector Smart Object 3.png'
import UltimateImg from '../../assets/landing-page/Vector Smart Object 4.png'
import PhoneImg from '../../assets/landing-page/Phone copy 4.png'
import WebDesignImg from '../../assets/landing-page/web-design.png'
import UIImg from '../../assets/landing-page/ui.png'
import ComputerImg from '../../assets/landing-page/computer.png'
import CustomerServiceImg from '../../assets/landing-page/customer-service.png'
import '../../../styles/landing-page/app.scss'

export const LandingPage = () => {
  const { googleLoginButton } = useGoogleLogin()
  const detectDevice = () => {
    const result = /Android|iPhone/i.test(navigator.userAgent)
    console.log('result:', result)
    return !result ? 'browser': 'mobile'
  }
  const postMessage = () => {
    const w: any = window
    w.ReactNativeWebView.postMessage("Hello!")
  }
  return (
    <div className="body-lp">
      <header className="header-l">
        <div className="container">
          <div className="header-l-main">
            <img className="logo" src={LogoColor} alt="" />
            <div className="header-l-nav">
              {googleLoginButton('header-l-link header-btn', 'Login')}
            </div>
          </div>
        </div>
      </header>
      <section className="hero">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-main">
              <div className="hero-demo">
                <div className="hero-choice">
                  <div className="hero-medal">
                    <img src={Medal} alt="" />
                  </div>
                  <p>#1 Fastest CV Builder Ever</p>
                </div>
                <h1 className="hero-heading">Best app for your job application</h1>
                <p className="hero-caption">
                  Increase productivity with a simple cv builder app for managing your personal
                  documents.
                </p>
                
                <p>{window.navigator.userAgent}</p>
                <br />
                <p>Device: {detectDevice()}</p>
                <button onClick={postMessage}>Post message</button>

                <div className="hero-group">{googleLoginButton('', 'Get started')}</div>
              </div>
              <div className="hero-banner">
                <img className="hero-img" src={HeroImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="feature">
        <div className="container">
          <div className="feature-main">
            <div className="feature-banner">
              <img src={FeatureBannerImg} alt="" className="feature-img" />
            </div>
            <div className="feature-app">
              <h2 className="feature-heading">Awesome apps features</h2>
              <p className="feature-caption">
                Increase productivity with a simple cv builder app for managing your personal
                documents.
              </p>

              <div className="feature-row">
                <div className="icon-lp icon-lp-red">
                  <img src={SpeedImg} alt="" />
                </div>
                <div className="feature-group">
                  <h4 className="title-lp title-red">Fast Performace</h4>
                  <p className="feature-txt">Provide you a very fast builder.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="icon-lp icon-lp-blue">
                  <img src={PrototypeImg} alt="" />
                </div>
                <div className="feature-group">
                  <h4 className="title-lp title-blue">Prototyping</h4>
                  <p className="feature-txt">You can clone your document easily.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="icon-lp icon-lp-green">
                  <img src={VectorImg} alt="" />
                </div>
                <div className="feature-group">
                  <h4 className="title-lp title-green">Vector Editing</h4>
                  <p className="feature-txt">Easy editor builder.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="jackpot">
        <div className="container">
          <div className="jackpot-main">
            <div className="jackpot-col">
              <h3 className="jackpot-heading">
                Smart builder that you may love this anytime & anywhere
              </h3>
            </div>
            <div className="jackpot-col">
              <p className="jackpot-txt">
                The rise of mobile devices transforms the way we consume information entirely and
                the worlds most elevant channels such as Facebook.
              </p>
            </div>
          </div>
          <div className="jackpot-list">
            <div className="jackpot-item">
              <div className="icon-lp icon-lp-red">
                <img src={BillImg} alt="" />
              </div>
              <div className="jackpot-group">
                <h4 className="title-lp title-red">Two column format</h4>
                <p className="jackpot-txt">You can choose your CV in type of one or two columns.</p>
              </div>
            </div>
            <div className="jackpot-item">
              <div className="icon-lp icon-lp-blue">
                <img src={NetworkImg} alt="" />
              </div>
              <div className="jackpot-group">
                <h4 className="title-lp title-blue">Drag & Drop</h4>
                <p className="jackpot-txt">You can drag to order your blocks everywhere.</p>
              </div>
            </div>
            <div className="jackpot-item">
              <div className="icon-lp icon-lp-green">
                <img src={BadgeImg} alt="" />
              </div>
              <div className="jackpot-group">
                <h4 className="title-lp title-green">Color customizing</h4>
                <p className="jackpot-txt">Customize your CV with beautiful color.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="integration">
        <div className="container">
          <div className="integration-main">
            <div className="integration-col">
              <img src={IntegrationImg} alt="" className="integration-img" />
            </div>
            <div className="integration-col">
              <h3 className="integration-heading">
                Designed & built by the latest code integration
              </h3>
              <p className="integration-txt">
                The rise of mobile devices transforms the way we consume information entirely and
                the worlds most elevant channels such as Facebook.
              </p>
              {googleLoginButton('integration-btn', 'Lean more')}
            </div>
          </div>
        </div>
      </section>
      <hr className="hr-lp" />
      <section className="ultimate">
        <div className="container">
          <div className="ultimate-main">
            <div className="ultimate-col">
              <h3 className="ultimate-heading">Ultimate Features that we built</h3>
              <p className="ultimate-caption">
                The rise of mobile devices transforms the way we consume information entirely.
              </p>
              <div className="ultimate-row">
                <div className="ultimate-item">
                  <div className="icon-lp icon-lp-red">
                    <img src={WebDesignImg} alt="" />
                  </div>
                  <div className="ultimate-group">
                    <h4 className="ultimate-title">App Development</h4>
                    <p className="ultimate-txt">Mordern CV builder</p>
                  </div>
                </div>
                <div className="ultimate-item">
                  <div className="icon-lp icon-lp-green">
                    <img src={UIImg} alt="" />
                  </div>
                  <div className="ultimate-group">
                    <h4 className="ultimate-title">UX Planning</h4>
                    <p className="ultimate-txt">Customizing everything of your CV</p>
                  </div>
                </div>
                <div className="ultimate-item">
                  <div className="icon-lp icon-lp-yellow">
                    <img src={ComputerImg} alt="" />
                  </div>
                  <div className="ultimate-group">
                    <h4 className="ultimate-title">Storage</h4>
                    <p className="ultimate-txt">
                      Your documents are saved and you can share it everywhere.
                    </p>
                  </div>
                </div>
                <div className="ultimate-item">
                  <div className="icon-lp icon-lp-purple">
                    <img src={CustomerServiceImg} alt="" />
                  </div>
                  <div className="ultimate-group">
                    <h4 className="ultimate-title">Customer Support</h4>
                    <p className="ultimate-txt">Contact us anytime you get stuck.</p>
                  </div>
                </div>
              </div>
              {googleLoginButton('', 'See all')}
            </div>
            <div className="ultimate-col"></div>
          </div>
          <img src={UltimateImg} alt="" className="ultimate-img img1" />
          <img src={PhoneImg} alt="" className="ultimate-img img2" />
        </div>
      </section>
      <hr className="hr-lp" />
      <section className="ask">
        <div className="container">
          <div className="ask-main">
            <h3 className="ask-heading">Frequently asked questions</h3>
            <p className="ask-caption">
              The rise of mobile devices transforms the way we consume information entirely and the
              worlds most elevant channels such as Facebook.
            </p>
            <div className="ask-body">
              <div className="ask-toggle">
                <div className="ask-toggle__top">
                  <p className="ask-toggle__title">How to contact with riders emergency?</p>
                  <button className="ask-toggle__btn toggle collapse"></button>
                </div>
                <p className="ask-toggle__body">
                  Leverage agile frameworks to provide a robust synopsis for high level overviews.
                  Iterative approaches to corporate strategy foster collaborative thinking to
                  further the overall value proposition. Organically grow the holistic world view of
                  disruptive innovation via workplace diversity and empowerment.
                </p>
              </div>
              <div className="ask-toggle">
                <div className="ask-toggle__top">
                  <p className="ask-toggle__title">
                    App installation failed, how to update system information?
                  </p>
                  <button className="ask-toggle__btn toggle collapse"></button>
                </div>
                <p className="ask-toggle__body">
                  Leverage agile frameworks to provide a robust synopsis for high level overviews.
                  Iterative approaches to corporate strategy foster collaborative thinking to
                  further the overall value proposition. Organically grow the holistic world view of
                  disruptive innovation via workplace diversity and empowerment.
                </p>
              </div>
              <div className="ask-toggle">
                <div className="ask-toggle__top">
                  <p className="ask-toggle__title">Website reponse taking time, how to improve?</p>
                  <button className="ask-toggle__btn toggle collapse"></button>
                </div>
                <p className="ask-toggle__body">
                  Leverage agile frameworks to provide a robust synopsis for high level overviews.
                  Iterative approaches to corporate strategy foster collaborative thinking to
                  further the overall value proposition. Organically grow the holistic world view of
                  disruptive innovation via workplace diversity and empowerment.
                </p>
              </div>
              <div className="ask-toggle">
                <div className="ask-toggle__top">
                  <p className="ask-toggle__title">New update fixed all bug and issues</p>
                  <button className="ask-toggle__btn toggle collapse"></button>
                </div>
                <p className="ask-toggle__body">
                  Leverage agile frameworks to provide a robust synopsis for high level overviews.
                  Iterative approaches to corporate strategy foster collaborative thinking to
                  further the overall value proposition. Organically grow the holistic world view of
                  disruptive innovation via workplace diversity and empowerment.
                </p>
              </div>
              <div className="ask-toggle">
                <div className="ask-toggle__top">
                  <p className="ask-toggle__title">How to contact with riders emergency?</p>
                  <button className="ask-toggle__btn toggle collapse"></button>
                </div>
                <p className="ask-toggle__body">
                  Leverage agile frameworks to provide a robust synopsis for high level overviews.
                  Iterative approaches to corporate strategy foster collaborative thinking to
                  further the overall value proposition. Organically grow the holistic world view of
                  disruptive innovation via workplace diversity and empowerment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <img src={Logo} alt="" className="footer-img" />
            {/* <div className="footer-nav">
              <a href="#" className="footer-link">
                Languages
              </a>
            </div> */}
            <p className="footer-copyright">Copyright© CV now 2020. All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
