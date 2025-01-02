import { NodeSDK } from "@opentelemetry/sdk-node"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { Resource } from "@opentelemetry/resources"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"

// Set up OTLP Trace Exporter for Axiom
const traceExporter = new OTLPTraceExporter({
    url: "https://api.axiom.co/v1/traces", // Axiom's OTLP endpoint
    headers: {
        Authorization: `xaat-bcc02e65-4a56-418d-844f-d71432377a97`, // Replace with your Axiom API token
        "X-Axiom-Dataset": "handydata", // Replace with your Axiom dataset name
    },
})

// Create a resource to identify your service in traces
const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "server.ts", // Replace with your service name
})

// Initialize the Node SDK with auto-instrumentations
const sdk = new NodeSDK({
    resource: resource,
    traceExporter: traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
})

// Start the SDK
sdk.start()

console.log("OpenTelemetry Node SDK initialized")

// Graceful shutdown on process exit
process.on("SIGTERM", () => {
    sdk.shutdown().then(() => {
        console.log("OpenTelemetry Node SDK shut down gracefully")
    })
})
