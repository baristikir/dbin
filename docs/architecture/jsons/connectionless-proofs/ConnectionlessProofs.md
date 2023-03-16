# Connectionless Proofs

To do that, first a request has to be created using: client.CreatePresentationRequest(...). The resulting json should be base64 encoded and attached in a request at request_presentation~attach[0].data.base64. The ~service object is required for the prover to know how to contact the verifier.
