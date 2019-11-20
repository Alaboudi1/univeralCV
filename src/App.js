import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Avatar, Modal, Badge, ButtonIcon } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const githubURL = 'https://raw.githubusercontent.com/SaudiOpenSourceCommunity/SaudiOSS/master/README.md';


function parseHTML(html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
}

async function fetchProjects() {
    let openSourceProjects = [];
    openSourceProjects = await fetch(githubURL).then(payload => payload.text());
    return tableToJSON(openSourceProjects);
}

//This looks ugly 🙁 but could not figure out better way to do it.
function tableToJSON(table) {
    const developers = [];
    const TableNode = Array.from(parseHTML(table).querySelector("tbody").children).splice(1);
    for (let i = 0; i < TableNode.length; i++) {
        let row = TableNode[i].cells;
        const developer = {};
        developer.NumberOfProjects = row[0].attributes[0].value;
        developer.name = row[0].innerText.trim();
        developer.githubURL = row[0].children[0] ? row[0].children[0].href.trim() : undefined;
        developer.project = [];
        developer.project.push({ name: row[1].innerText.trim(), URL: row[1].children[0].href.trim(), description: row[2].innerText.trim() });
        for (let j = 1; j < developer.NumberOfProjects; j++) {
            row = TableNode[++i].cells;
            developer.project.push({ name: row[0].innerText.trim(), URL: row[0].children[0].href.trim(), description: row[1].innerText.trim() });
        }
        developers.push(developer);
    }
    return developers;
}



function App() {
    return (
        <div className="container" >
            <HeroHeadLine />
            <DevInfo />
            <DevInfo />
            <DevInfo />
        </div>
    )
}

function HeroHeadLine() {
    const backgroundImgRef = useRef(null);
    return (
        <>
            <div className="hero" ref={backgroundImgRef}>
                <img src="logo_mini.png" />
                <p className="oss-title">
                    المجموعة السعودية للمصادر المفتوحة
            </p>
            </div>
        </>
    );
}

function DevInfo() {
    const [closed, handleOnClose] = useState(false);
    const [developers, loadDevelopers] = useState([]);
    useEffect(() => {
        loadDevelopers(fetchProjects())
    }, [])

    return (
        <div className="rainbow-m-around_large item">
            <Card footer=
                {
                    <>
                        <Button variant="brand" className="rainbow-m-around_medium" onClick={() => handleOnClose(true)}>
                            <Badge
                                className="rainbow-m-around_xx"
                                label="2"
                                title="the badge title"
                                style={{ padding: '0.25em 0.50em', margin: "-2em -1em 1.5em" }}

                            />
                            المشاريع البرمجية
                        <FontAwesomeIcon icon={faCode} className="rainbow-m-left_medium" />

                        </Button>

                    </>
                }
            >
                <div className="rainbow-p-around_xx-large rainbow-align-content_center rainbow-flex_column" >
                    <Avatar
                        src="https://github.com/Alaboudi1.png"
                        assistiveText=" عبدالعزيز العبودي"
                        title=" عبدالعزيز العبودي"
                        size="large"
                        style={{ height: '5.2rem', width: '5.2rem' }}
                    />
                    <h1 className="rainbow-p-top_large rainbow-font-size-heading_small rainbow-color_dark-1"> عبدالعزيز العبودي</h1>
                </div>
                <Modal
                    isOpen={closed}
                    onRequestClose={() => handleOnClose(false)}
                    title="المشاريع"
                    footer={
                        <div className="rainbow-flex rainbow-justify_spread">
                            <Avatar
                                src="https://github.com/Alaboudi1.png"
                                assistiveText=" عبدالعزيز العبودي"
                                title=" عبدالعزيز العبودي"
                                size="large"
                            />
                            <Badge
                                className="rainbow-m-around_medium"
                                label="عبدالعزيز العبودي"
                                variant="inverse"
                            />
                        </div>
                    }
                >

                </Modal>

            </Card>

        </div >

    );
}
// curl https://api.github.com/search/repositories?q=sameik





export default App;
