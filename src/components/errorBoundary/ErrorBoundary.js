import { Component } from "react";

// Компонент - предохранитель (ловит ошибку)

class ErrorBoundary extends Component {
    state = {
        error: false
    }


    componentDidCatch(error, info) {
        console.log(error, info);
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return(
                <h2>Something went wrong</h2>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 