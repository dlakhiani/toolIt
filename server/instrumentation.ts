import { NodeSDK } from "@opentelemetry/sdk-node"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { Resource } from "@opentelemetry/resources"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"

const traceExporter = new OTLPTraceExporter({
    url: "https://api.axiom.co/v1/traces",
    headers: {
        Authorization: `xaat-bcc02e65-4a56-418d-844f-d71432377a97`, //Axiom API token
        "X-Axiom-Dataset": "handydata", // Axiom dataset name
    },
})
const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "server.ts",
})

const sdk = new NodeSDK({
    resource: resource,
    traceExporter: traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
})
sdk.start()

console.log("OpenTelemetry Node SDK initialized")
process.on("SIGTERM", () => {
    sdk.shutdown().then(() => {
        console.log("OpenTelemetry Node SDK shut down gracefully")
    })
})
