import { NodeSDK } from "@opentelemetry/sdk-node"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { Resource } from "@opentelemetry/resources"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"
import dotenv from "dotenv"

dotenv.config()

const traceExporter = new OTLPTraceExporter({
    url: "https://api.axiom.co/v1/traces",
    headers: {
        Authorization: `${process.env.AXIOM_API_TOKEN}`, //Axiom API token
        "X-Axiom-Dataset": "toolIt", // Axiom dataset name
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
