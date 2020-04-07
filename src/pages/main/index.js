import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from './../../services/api';

import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await Api.get(`/products?page=${page}`);
        const { docs, ...productInfo } = response.data;

        this.setState({ products: docs, productInfo });
    }

    prevPage = () => {
        const { productInfo } = this.state;

        if (productInfo.page === productInfo.prevPage || productInfo.prevPage === null) return;

        this.loadProducts(productInfo.prevPage);
    }

    nextPage = () => {
        const { productInfo } = this.state;

        if (productInfo.page === productInfo.nextPage || productInfo.nextPage === null) return;

        this.loadProducts(productInfo.nextPage);
    }

    render() {
        const { products, productInfo } = this.state;

        return <div className="product-list">
            {products.map(product => (
                <article key={product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>

                    <Link to={`/product/${product._id}`}>Acessar</Link>
                </article>
            ))}
            <div className="actions">
                <button disabled={productInfo.hasPrevPage === false} onClick={this.prevPage}>Anterior</button>
                <button disabled={productInfo.hasNextPage === false} onClick={this.nextPage}>Próximo</button>
            </div>
        </div>
    }
}