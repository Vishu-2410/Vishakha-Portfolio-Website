import { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/vish3.jpg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  // Removed the unused 'index' state
  // const [index, setIndex] = useState(1);
  const period = 2000;

  // Use useMemo to memoize the 'toRotate' array
  const toRotate = useMemo(() => ["Full Stack Developer", "Web Developer", "Frontend Developer", "UI/UX Designer"], []);

  // Memoize the tick function to prevent it from being recreated unnecessarily
  const tick = useCallback(() => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  }, [loopNum, isDeleting, text, toRotate]);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker); };
  }, [tick, delta]); // Ensure 'tick' and 'delta' are in the dependency array

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1>{`Hi! I'm Vishakha Mourya`}<br />
                    <span className="txt-rotate" dataPeriod="1000" data-rotate='["Full Stack Developer", "Web Developer", "Frontend Developer", "UI/UX Designer"]'>
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <p>As a Full Stack Developer, I have a diverse skill set that enables me to design, develop, and deploy end-to-end
                    web applications. With a passion for problem-solving and an eye for detail, I am dedicated to delivering high-quality,
                    user-centric solutions that meet the needs of clients and users alike.</p>
                  <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img" />
                </div>}
            </TrackVisibility>
          </Col>
          <Col>
            <a href='#connect' className='scroll_down'>Scroll Down</a>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
