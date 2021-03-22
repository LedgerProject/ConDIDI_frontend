import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    width: 100%;
    padding: 4em; 
    background-color: #f7f7f7;
    border-radius: 25px; 
    overflow-x: scroll; 
    text-align: left; 
`

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: '',
        }

        this.loadData = this.loadData.bind(this);
        this.getToken = this.getToken.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        await this.getToken();
    }

    getToken = async () => {
        this.setState({
            token: JSON.parse(localStorage.getItem('token')),
        })
    }



    render() {

        return (
            <Wrapper>
                <h2>Impressum</h2>
                <p>Impressum zu dieser Website – zugleich Anbieterkennzeichnung gem. § 5 Telemediengesetz (TMG)</p>
                <br /> 
                <p><strong>Herausgeber:</strong></p>
                <p>
                    Technische Informationsbibliothek (TIB)
                    <br/>
                    Welfengarten 1 B, 30167 Hannover
                    <br /> 
                    Postfach 6080, 30060 Hannover
                </p>
                <br/> 
                <br />
                <p><strong>Vertretungsberechtigte Person:</strong></p>
                <p>Prof. Dr. Sören Auer (Direktor der TIB)</p>
                <br /> 
                <p>Die Technische Informationsbibliothek (TIB) ist eine Stiftung öffentlichen Rechts des Landes Niedersachsen.</p>
                <br /> 
                <p><strong>Aufsichtsbehörde: </strong></p>
                <p>Ministerium für Wissenschaft und Kultur des Landes Niedersachsen</p>
                <br /> 
                <p><strong>Kontakt: </strong></p>
                <p>
                    Telefon: 0511 762-8989
                    <br/>
                    Fax: 0511 762-4076
                    <br /> 
                    E-Mail: <a href='mailto:information@tib.eu'> information at tib.eu </a>
                </p>
                <br /> 
                <p><strong>Umsatzsteuer-Identifikationsnummer: </strong></p>
                <p>DE 214931803</p>
                <br /> 
                <p><strong>Redaktion: </strong></p>
                <p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Dr. Sandra Niemeyer; E-Mail: <a href='mailto:sandra.niemeyer@tib.eu'>sandra.niemeyer at tib.eu </a> </p> 
                <br /> 
                <p><strong>Urheberrechtshinweis: </strong></p>
                <p>Das Layout der Homepage, die verwendeten Grafiken sowie die sonstigen Inhalte sind urheberrechtlich geschützt. </p> 

            </Wrapper>
        )
    }

}

export default Home;