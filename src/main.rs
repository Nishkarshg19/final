use axum::{Router, routing::get, Extension};
use dotenv::dotenv;

use std::sync::Arc;
use web3_backend::{handle_number, create_provider};

#[tokio::main]
async fn main() {
    dotenv().ok();
    let provider = create_provider().await.expect("Failed to create provider");
    
    let app = Router::new()
        .route("/api/number/", get(handle_number))
        .layer(Extension(Arc::new(provider)));

    axum::Server::bind(&"0.0.0.0:8080".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}