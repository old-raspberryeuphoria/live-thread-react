import React, { Component } from 'react';

class LoadingText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dots: '',
    };
  }

  componentDidMount() {
    this.textAnimation = setInterval(() => {
      const { dots } = this.state;
      let newDots = dots.length < 3 ? `${dots}.` : '';
      this.setState({ dots: newDots });
    }, 150);
  }

  componentWillUnmount() {
    clearInterval(this.textAnimation);
  }

  render() {
    const { dots } = this.state;

    return (
      <div>Loading {dots}</div>
    );
  }
}

export default LoadingText;
