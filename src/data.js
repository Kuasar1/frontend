export const sliderItems = [
	{
		id: 1,
		img: "https://www.pngall.com/wp-content/uploads/5/Model-Man-In-Suit.png",
		title: "MEN'S STYLE",
		desc: "Top mens clothes and products for you!",
		bg: "fbf0f4",
		cat: "men",
	},
	{
		id: 2,
		img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/21348573-c6ed-461c-b9a3-722cd4624864/da7f6xv-1bfca261-c4b8-46ea-a75a-8a015353cd2c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIxMzQ4NTczLWM2ZWQtNDYxYy1iOWEzLTcyMmNkNDYyNDg2NFwvZGE3ZjZ4di0xYmZjYTI2MS1jNGI4LTQ2ZWEtYTc1YS04YTAxNTM1M2NkMmMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.z_Ua8-k-t6dU_a62RUnAbSalkuxHT0_gCAl4439YsLQ",
		title: "WOMEN'S STYLE",
		desc: "Beautiful and stylish women's clothing just for you!",
		bg: "f5fafd",
		cat: "woman",
	},
	{
		id: 3,
		img: "https://www.pikpng.com/pngl/b/272-2720818_transparent-nikes-air-mag-nike-air-mags-transparent.png",
		title: "TOP SNEAKERS",
		desc: "Stylish and comfortable sneakers!",
		bg: "fcf1ed",
		cat: "sneakers",
	},
];

export const suggestions = [
	{
		id: 1,
		img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEX//M+qMHinAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC",
		title: "JUST FOR YOU",
		key: "JustForYou",
	},
	{
		id: 2,
		img: "https://cdn.shopify.com/s/files/1/0010/0994/2575/products/2007-60-pastelpink_2000x.png?v=1576886761",
		title: "SEE WHAT OTHERS LIKE",
		key: "YouMayLike",
	},
	{
		id: 3,
		img: "https://www.color-name.com/color-image?c=A4D8D8&desktop",
		title: "THE MOST POPULAR",
		key: "MostPopular",
	},
];

export const stripeData = {
	alternate_statement_descriptors: null,
	amount: 49000,
	amount_captured: 49000,
	amount_refunded: 0,
	application: null,
	application_fee: null,
	application_fee_amount: null,
	authorization_code: null,
	balance_transaction: "txn_3KqztsEOGKKJfFNa0MizaTVp",
	billing_details: {
		address: {
			city: "n",
			country: "United States",
			line1: "Test address",
			line2: null,
			postal_code: "123",
			state: null,
		},
		email: null,
		name: "Test",
		phone: null,
	},
	calculated_statement_descriptor: "Stripe",
	captured: true,
	created: 1650547104,
	currency: "usd",
	customer: null,
	description: null,
	destination: null,
	dispute: null,
	disputed: false,
	failure_balance_transaction: null,
	failure_code: null,
	failure_message: null,
	fraud_details: {
		stripe_report: null,
		user_report: null,
	},
	id: "ch_3KqztsEOGKKJfFNa0PFIBwjl",
	invoice: null,
	level3: null,
	livemode: false,
	metadata: {},
	object: "charge",
	on_behalf_of: null,
	order: null,
	outcome: {
		network_status: "approved_by_network",
		reason: null,
		risk_level: "normal",
		risk_score: 27,
		rule: null,
		seller_message: "Payment complete.",
		type: "authorized",
	},
	paid: true,
	payment_intent: null,
	payment_method: "card_1KqztmEOGKKJfFNaX7AhxbP2",
	payment_method_details: {
		ach_credit_transfer: null,
		ach_debit: null,
		acss_debit: null,
		afterpay_clearpay: null,
		alipay: null,
		au_becs_debit: null,
		bacs_debit: null,
		bancontact: null,
		boleto: null,
		card: {
			brand: "visa",
			checks: {
				address_line1_check: "pass",
				address_postal_code_check: "pass",
				cvc_check: "pass",
			},
			country: "US",
			description: null,
			exp_month: 12,
			exp_year: 2034,
			fingerprint: "cqCUc5MeiFsgQJEU",
			funding: "credit",
			iin: null,
			installments: null,
			issuer: null,
			last4: "4242",
			mandate: null,
			moto: null,
			network: "visa",
			three_d_secure: null,
			wallet: null,
		},
		card_present: null,
		eps: null,
		fpx: null,
		giropay: null,
		grabpay: null,
		ideal: null,
		interac_present: null,
		klarna: null,
		konbini: null,
		multibanco: null,
		oxxo: null,
		p24: null,
		paynow: null,
		sepa_credit_transfer: null,
		sepa_debit: null,
		sofort: null,
		stripe_account: null,
		type: "card",
		us_bank_account: null,
		wechat: null,
		wechat_pay: null,
	},
	receipt_email: null,
	receipt_number: null,
	receipt_url:
		"https://pay.stripe.com/receipts/acct_1Kp60SEOGKKJfFNa/ch_3KqztsEOGKKJfFNa0PFIBwjl/rcpt_LY66MitXPzo0iJkpiMvHHeqN0Qc89JP",
	refunded: false,
	refunds: {
		object: "list",
		data: [],
		has_more: false,
		url: "/v1/charges/ch_3KqztsEOGKKJfFNa0PFIBwjl/refunds",
		request_params: null,
	},
	review: null,
	shipping: null,
	source: {
		account: null,
		address_city: "n",
		address_country: "United States",
		address_line1: "Test address",
		address_line1_check: "pass",
		address_line2: null,
		address_state: null,
		address_zip: "123",
		address_zip_check: "pass",
		available_payout_methods: null,
		brand: "Visa",
		country: "US",
		currency: null,
		customer: null,
		cvc_check: "pass",
		default_for_currency: null,
		deleted: null,
		description: null,
		dynamic_last4: null,
		exp_month: 12,
		exp_year: 2034,
		fingerprint: "cqCUc5MeiFsgQJEU",
		funding: "credit",
		id: "card_1KqztmEOGKKJfFNaX7AhxbP2",
		iin: null,
		issuer: null,
		last4: "4242",
		metadata: {},
		name: "Test",
		object: "card",
		recipient: null,
		status: null,
		tokenization_method: null,
	},
	source_transfer: null,
	statement_descriptor: null,
	statement_descriptor_suffix: null,
	status: "succeeded",
	transfer: null,
	transfer_data: null,
	transfer_group: null,
};
