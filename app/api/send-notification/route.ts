import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

const apiKeys = {
	publicKey:
		"BEY8-HDPGU44GHHbF95zfqovsjwJrTD4g9G-X85Vvj25BqknU2wEyzoxsNoKc09u0a9aaLf5-C5y_NHrVI9Ytec",
	privateKey: "UkZq9E-kLWs46XX-oxQKGm8EN2wYWF10n8ynEnjfCe4",
};

webpush.setVapidDetails(
	"mailto:harsh.techilia@gmail.com",
	apiKeys.publicKey,
	apiKeys.privateKey
);
