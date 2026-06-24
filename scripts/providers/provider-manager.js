// providers/provider-manager.js

import {
    extractFactsOpenAI
} from "./openai-compatible-provider.js";

export async function extractFacts(
    text
) {

    console.log(
        "[CCM] Provider Manager"
    );

    return await extractFactsOpenAI(
        text
    );
}