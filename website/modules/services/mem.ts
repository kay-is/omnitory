const MEM_CONTRACT_ID = "ypi-DzrJqZDxTnlhmbfNFjdSO73zHC6lHD7GUFhllx0"
const MEM_READ_STATE_URL = "https://api.mem.tech/api/state/" + MEM_CONTRACT_ID

interface Domain {
  owner: string
  tx_id: string
  domain: string
}

export async function findPackages(packageName: string) {
  const memResponse = await fetch(MEM_READ_STATE_URL)
  const state = await memResponse.json()

  const domain = state.domains.find(
    (domain: Domain) => packageName === domain.domain
  )

  if (!domain) return null

  const ArweaveResponse = await fetch("https://arweave.net/" + domain.tx_id)
  return ArweaveResponse.json()
}
