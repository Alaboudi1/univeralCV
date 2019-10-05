import React from 'react';
import logo from './logo.svg';
import './App.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

const developers = [];

function parseHTML(html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
}

async function fetchProjects() {
    let openSourceProjects = [];
    openSourceProjects = await fetch('https://raw.githubusercontent.com/SaudiOpenSourceCommunity/SaudiOSS/master/README.md').then(payload => payload.text());
    return tableToJSON(openSourceProjects);

}
function tableToJSON(table) {
    const TableNode = Array.from(parseHTML(table).querySelector("tbody").children).splice(1);
    for (let i = 0; i < TableNode.length; i++) {
        let row = TableNode[i].cells;
        const developer = {};
        developer.NumberOfProjects = row[0].attributes[0].value;
        developer.name = row[0].innerText.trim();
        developer.githubURL = row[0].children[0] ? row[0].children[0].href.trim() : undefined;
        developer.project = [];
        developer.project.push({ name: row[1].innerText.trim(), URL: row[1].children[0].href.trim(),  description: row[2].innerText.trim()});
        for (let j = 1; j < developer.NumberOfProjects; j++) {
            row = TableNode[++i].cells;
            developer.project.push({ name: row[0].innerText.trim(),URL: row[0].children[0].href.trim() , description: row[1].innerText.trim()});
        }
        developers.push(developer);
    }
    console.log(developers);
}
fetchProjects()

function App() {
    return (
        <Flippy
            flipOnHover={false} // default false
            flipOnClick={true} // default false
            flipDirection="horizontal" // horizontal or vertical
            // ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
            // if you pass isFlipped prop component will be controlled component.
            // and other props, which will go to div
            style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
        >
            <FrontSide
                style={{
                    backgroundColor: '#41669d',
                }}
            >
                RICK
    </FrontSide>
            <BackSide
                style={{ backgroundColor: '#175852' }}>
                ROCKS
    </BackSide>
        </Flippy>
    );
}

export default App;
