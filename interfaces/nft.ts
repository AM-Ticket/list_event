export interface INFT {
  token_id: string,
  owner_id: string,
  metadata: {
    title: string,
    description: string | null,
    media: string,
    media_hash:string | null,
    copies: number,
    issued_at: number | null,
    expires_at: number | null,
    starts_at: number | null,
    updated_at: number | null,
    extra: string | null,
    reference: string | null
    reference_hash: string | null
  },
  approved_account_ids?: object | null
}