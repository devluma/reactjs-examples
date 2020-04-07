import React, { Component } from 'react';
import Api from './../../services/api';

import './styles.css';

export default class Product extends Component {
    state = {
        product: {},
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await Api.get(`/product/${id}`);

        this.setState({ product: response.data });
    }

    render() {
        const { product } = this.state;

        return <div className="product-detail">
            <article>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p>
                    <strong>URL:</strong><a href={product.url} target="_blank" rel="noopener noreferrer">{product.url}</a>
                </p>
            </article>
            <div className="actions">
                <a href="/" >Voltar</a>
            </div>
        </div>
    }
}