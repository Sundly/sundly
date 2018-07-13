//appjs es el body con el que voy a dividir la aplicación, generalmente es header, body y footer
//Dependencias
import React, { Component } from 'react';
import Proptypes from 'prop-types';


class Body extends Component {
  static propTypes = {
    content: Proptypes.object.isRequired,//libreria.tipodeObjeto.EsRequeridoOÑo
  }
  
  render() {
    const {content} =this.props    
    return (
        <div>
          {content}
        </div>
    );
  }
}

export default Body;