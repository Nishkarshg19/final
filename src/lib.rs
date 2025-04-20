use axum::{Extension};
use ethers::providers::{Provider, Http , Middleware};
use std::env;
use std::sync::Arc;

pub async fn create_provider() -> Result<Arc<Provider<Http>>, Box<dyn std::error::Error>> {
    let rpc_url = env::var("GOERLI_RPC_URL")?;
    let provider = Provider::<Http>::try_from(rpc_url)?;
    Ok(Arc::new(provider))
}

pub async fn handle_number(Extension(provider): Extension<Arc<Provider<Http>>>) -> String {
    // Logic to interact with the blockchain and return the number
    // For example, you could fetch the latest block number
    match provider.get_block_number().await {
        Ok(block_number) => format!("Latest block number: {}", block_number),
        Err(err) => format!("Error fetching block number: {}", err),
    }
}