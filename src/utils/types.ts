export interface IToken {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  country: string;
  account_id: string;
  refresh_token?: string;
  timestamp: number;
}

export interface IResponseTokenCms {
  cms: ITokenCms;
  service_available: boolean;
  default_marketing_opt_in: boolean;
}

export interface ITokenCms {
  bucket: string;
  policy: string;
  signature: string;
  key_pair_id: string;
  expires: string;
}

export interface IHomeFeedItem {
  __class__: string;
  __href__: string;
  __links__: Links;
  id: string;
  title: string;
  resource_type: string;
  display_type: string;
  description: string;
  source_media_id: string;
  source_media_title: string;
}

export interface ICarouselItem {
  id: number;
  images: Images;
  link: string;
  slug: string;
  title: string;
  description: string;
  button_text: string;
}

interface Images {
  landscape_poster: string;
  portrait_poster: string;
}

interface Links {
  resource: Resource;
}

interface Resource {
  href: string;
}

export interface IProfile {
  avatar: string;
  cr_beta_opt_in: boolean;
  crleg_email_verified: boolean;
  email: string;
  mature_content_flag_manga: string;
  maturity_rating: string;
  opt_out_android_in_app_marketing: boolean;
  opt_out_free_trials: boolean;
  opt_out_new_media_queue_updates: boolean;
  opt_out_newsletters: boolean;
  opt_out_pm_updates: boolean;
  opt_out_promotional_updates: boolean;
  opt_out_queue_updates: boolean;
  opt_out_store_deals: boolean;
  preferred_communication_language: string;
  preferred_content_subtitle_language: string;
  qa_user: boolean;
  username: string;
}
