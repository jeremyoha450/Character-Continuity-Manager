// providers/openai-compatible-provider.js

import {
    providerSettings
} from "./provider-settings.js";

export async function extractFactsOpenAI(
    text
) {

    console.log(
        "[CCM] OpenAI Provider"
    );

    const response =
        await fetch(
            providerSettings.endpoint +
            "/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Authorization":
                        "Bearer " +
                        providerSettings.apiKey
                },

                body: JSON.stringify({
                    model:
                        providerSettings.model,

                    messages: [
						{
							role: "system",
							content: `[Pause roleplay. Extract character facts.

								For each field, provide a confidence score from 0 to 100.

								100 = exact value explicitly written.
								75 = strongly implied.
								50 = inferred.
								25 = weak guess.
								0 = unknown.

								Return ONLY valid JSON.
								
								If important facts do not fit the schema,
								store them in notes.
								
								Use the most concise value possible.
								
								If a value is not present in the description:

								- leave value empty
								- set confidence to 0

								Every field may appear exactly once.

								Never duplicate fields.

								Never invent information.

								Do not create new fields.

								Use EXACTLY this schema:

								{
								  "age": {
									"value": "",
									"confidence": 0
								  },

								  "eyeColor": {
									"value": "",
									"confidence": 0
								  },

								  "hair": {
									"value": "",
									"confidence": 0
								  },

								  "height": {
									"value": "",
									"confidence": 0
								  },

								  "bodyType": {
									"value": "",
									"confidence": 0
								  },

								  "personality": {
									"value": "",
									"confidence": 0
								  },
									"gender": {
										"value": "",
										"confidence": 0
									},

									"species": {
										"value": "",
									   "confidence": 0
									},

								  "notes": ""
								}
								
								bodyType should describe physical build only.

								Examples:
								- petite
								- athletic
								- curvy
								- slim
								- muscular
								- lithe

								Keep notes under 100 words.
								Only include facts that do not fit existing fields.

								Do not use attractiveness terms such as hot, sexy, beautiful, attractive.

								Do not add additional fields.
								Do not explain.
								Do not use markdown.
								Do not wrap in code fences.
								Return JSON only.]`
							},
						{
							role: "user",
							content: `Character Description:

					${text}`
						}
					]
                })
            }
        );

    const data =
        await response.json();

    console.log(
        "[CCM] AI Response",
        data
    );

    const content =
    data?.choices?.[0]?.message?.content;

	console.log(
		"[CCM] AI Content",
		content
	);

	try {

		const parsed =
			JSON.parse(content);

		console.log(
			"[CCM] Parsed Facts",
			parsed
		);

		return parsed;

	} catch (error) {

		console.error(
			"[CCM] Failed To Parse JSON",
			error
		);

		return {
			age: {
				value: "",
				confidence: 0
			},

			eyeColor: {
				value: "",
				confidence: 0
			},

			hair: {
				value: "",
				confidence: 0
			}
		};;
	}
}