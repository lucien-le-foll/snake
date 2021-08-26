import React from 'react';

class Cell extends React.Component {
    constructor(props){
        super(props)

        this.state = { className : '' };
    }

    componentDidMount() {
        switch (this.props.type) {
            case 'BLANK':
                this.setState({className :  'h-5 w-5 m-auto bg-gray-300 rounded-sm'});
                break;
            case 'SNAKE':
                this.setState({className : 'h-5 w-5 m-auto bg-gray-500 rounded-sm animate-pulse-fast'});
                break;
            case 'FOOD':
                this.setState({className : 'h-5 w-5 m-auto bg-yellow-500 rounded-full'});
                break;
            default:
                break;
        }
    }
    
    render() {
        return <div className={this.state.className}></div>;
    }
}

export default Cell;