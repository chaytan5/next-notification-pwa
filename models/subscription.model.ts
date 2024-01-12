import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
	{
		endpoint: String,
		expirationTime: Number || null,
		id: String,
		keys: {
			p256dh: String,
			auth: String,
		},
	},
	{ timestamps: true }
);

const Subscription =
	mongoose.models.subscriptions ||
	mongoose.model("subscriptions", subscriptionSchema);

export default Subscription;

/**
 * 
 * {
    endpoint: 
      'https://fcm.googleapis.com/fcm/send/fcCzuYS8ePc:APA91bEbA8aQNoQ0HOvqQBjq9tXUae-LzGQstJvunC33rnc_8BW2Z-ner7QXt1hI_vJhzjPaLvBfRrZhIhkUq1ErHsYlAOFaSjS6HPEwjIdlyDcotXi7KjhRTgY5znZq6-mmRsFp5fjx',
    expirationTime: null,
    keys: {
      p256dh: 
        'BMnqQtT-owR8dVToW0176Ii1WhETmYlqZ5nan6T-MiWlg-Ig6wfjwodcGbY5lHMlCMaBBaChZfAqUofwXoEYrT8',
      auth: 'XkgQOYz6WS4HrSFXb627KA'
    }
  }
 */
