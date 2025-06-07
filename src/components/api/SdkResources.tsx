
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, ExternalLink, Code, Github, Star } from 'lucide-react';

const SdkResources = () => {
  const sdks = [
    {
      name: 'JavaScript SDK',
      version: 'v2.1.0',
      description: 'For web applications and Node.js',
      language: 'javascript',
      downloads: '45.2k',
      stars: 1234,
      lastUpdated: '2024-06-01',
      features: ['TypeScript support', 'Tree-shaking', 'Promise-based', 'Browser & Node.js']
    },
    {
      name: 'Python SDK',
      version: 'v1.8.3',
      description: 'For server-side Python applications',
      language: 'python',
      downloads: '32.1k',
      stars: 892,
      lastUpdated: '2024-05-28',
      features: ['Async support', 'Type hints', 'Django integration', 'Flask middleware']
    },
    {
      name: 'PHP SDK',
      version: 'v1.5.2',
      description: 'For PHP applications and frameworks',
      language: 'php',
      downloads: '28.7k',
      stars: 567,
      lastUpdated: '2024-05-25',
      features: ['Composer package', 'Laravel support', 'Symfony bundle', 'PSR compliance']
    },
    {
      name: 'Go SDK',
      version: 'v1.3.0',
      description: 'For Go applications',
      language: 'go',
      downloads: '15.4k',
      stars: 445,
      lastUpdated: '2024-05-30',
      features: ['Context support', 'HTTP/2', 'Modules', 'Minimal dependencies']
    },
    {
      name: 'Ruby SDK',
      version: 'v2.0.4',
      description: 'For Ruby applications and Rails',
      language: 'ruby',
      downloads: '12.3k',
      stars: 334,
      lastUpdated: '2024-05-22',
      features: ['Rails integration', 'RSpec helpers', 'ActiveRecord support', 'Gem package']
    },
    {
      name: 'Java SDK',
      version: 'v1.7.1',
      description: 'For Java applications',
      language: 'java',
      downloads: '9.8k',
      stars: 289,
      lastUpdated: '2024-05-20',
      features: ['Maven support', 'Spring Boot', 'Android compatible', 'Jackson integration']
    }
  ];

  const tools = [
    {
      name: 'CLI Tool',
      description: 'Command-line interface for API management',
      version: 'v1.4.2',
      platform: 'Cross-platform',
      features: ['API key management', 'Webhook testing', 'Log streaming', 'Deployment tools']
    },
    {
      name: 'Postman Collection',
      description: 'Pre-configured API collection for testing',
      version: 'v2.1.0',
      platform: 'Postman',
      features: ['All endpoints', 'Environment variables', 'Test scripts', 'Documentation']
    },
    {
      name: 'OpenAPI Spec',
      description: 'Complete OpenAPI 3.0 specification',
      version: 'v1.0.0',
      platform: 'Standard',
      features: ['Full API coverage', 'Code generation', 'Documentation', 'Validation']
    },
    {
      name: 'Webhook Tester',
      description: 'Local webhook testing and debugging tool',
      version: 'v0.9.1',
      platform: 'Node.js',
      features: ['Local tunneling', 'Request logging', 'Response simulation', 'SSL support']
    }
  ];

  const codeExamples = {
    javascript: `import PaymentAPI from '@payment-gateway/sdk';

const client = new PaymentAPI({
  apiKey: 'your-api-key',
  environment: 'sandbox' // or 'production'
});

// Create a payment
const payment = await client.payments.create({
  amount: 1000, // $10.00
  currency: 'USD',
  payment_method: 'card',
  metadata: {
    order_id: 'order_123'
  }
});

console.log('Payment created:', payment.id);`,

    python: `from payment_gateway import PaymentAPI

client = PaymentAPI(
    api_key='your-api-key',
    environment='sandbox'  # or 'production'
)

# Create a payment
payment = client.payments.create(
    amount=1000,  # $10.00
    currency='USD',
    payment_method='card',
    metadata={
        'order_id': 'order_123'
    }
)

print(f'Payment created: {payment.id}')`,

    php: `<?php
require_once 'vendor/autoload.php';

use PaymentGateway\\PaymentAPI;

$client = new PaymentAPI([
    'api_key' => 'your-api-key',
    'environment' => 'sandbox' // or 'production'
]);

// Create a payment
$payment = $client->payments->create([
    'amount' => 1000, // $10.00
    'currency' => 'USD',
    'payment_method' => 'card',
    'metadata' => [
        'order_id' => 'order_123'
    ]
]);

echo 'Payment created: ' . $payment->id;`,

    go: `package main

import (
    "fmt"
    "github.com/payment-gateway/sdk-go"
)

func main() {
    client := paymentgateway.New("your-api-key", "sandbox")
    
    payment, err := client.Payments.Create(&paymentgateway.PaymentParams{
        Amount:        1000, // $10.00
        Currency:      "USD",
        PaymentMethod: "card",
        Metadata: map[string]string{
            "order_id": "order_123",
        },
    })
    
    if err != nil {
        panic(err)
    }
    
    fmt.Printf("Payment created: %s\\n", payment.ID)
}`,

    ruby: `require 'payment_gateway'

client = PaymentGateway::Client.new(
  api_key: 'your-api-key',
  environment: 'sandbox' # or 'production'
)

# Create a payment
payment = client.payments.create(
  amount: 1000, # $10.00
  currency: 'USD',
  payment_method: 'card',
  metadata: {
    order_id: 'order_123'
  }
)

puts "Payment created: #{payment.id}"`,

    java: `import com.paymentgateway.PaymentAPI;
import com.paymentgateway.model.Payment;
import com.paymentgateway.model.PaymentRequest;

PaymentAPI client = new PaymentAPI.Builder()
    .setApiKey("your-api-key")
    .setEnvironment("sandbox") // or "production"
    .build();

PaymentRequest request = PaymentRequest.builder()
    .amount(1000L) // $10.00
    .currency("USD")
    .paymentMethod("card")
    .putMetadata("order_id", "order_123")
    .build();

Payment payment = client.payments().create(request);
System.out.println("Payment created: " + payment.getId());`
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      javascript: 'bg-yellow-100 text-yellow-800',
      python: 'bg-blue-100 text-blue-800',
      php: 'bg-purple-100 text-purple-800',
      go: 'bg-cyan-100 text-cyan-800',
      ruby: 'bg-red-100 text-red-800',
      java: 'bg-orange-100 text-orange-800'
    };
    return colors[language] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">SDKs & Developer Tools</h2>
        <p className="text-gray-600">Official SDKs, tools, and resources for seamless integration</p>
      </div>

      <Tabs defaultValue="sdks" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sdks">Official SDKs</TabsTrigger>
          <TabsTrigger value="tools">Developer Tools</TabsTrigger>
          <TabsTrigger value="examples">Code Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="sdks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdks.map((sdk) => (
              <Card key={sdk.name} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={getLanguageColor(sdk.language)}>
                      {sdk.language}
                    </Badge>
                    <Badge variant="outline">{sdk.version}</Badge>
                  </div>
                  <CardTitle className="text-lg">{sdk.name}</CardTitle>
                  <CardDescription>{sdk.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{sdk.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{sdk.stars}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Features:</h5>
                    <div className="space-y-1">
                      {sdk.features.map((feature, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download SDK
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500">
                    Last updated: {sdk.lastUpdated}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Card key={tool.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <Badge variant="outline">{tool.version}</Badge>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm">
                    <span className="font-medium">Platform: </span>
                    <span className="text-gray-600">{tool.platform}</span>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Features:</h5>
                    <div className="space-y-1">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(codeExamples).map(([language, code]) => (
              <Card key={language}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg capitalize">{language}</CardTitle>
                    <Badge className={getLanguageColor(language)}>
                      {language}
                    </Badge>
                  </div>
                  <CardDescription>Quick start example for {language}</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Code className="h-4 w-4 mr-2" />
                      Copy Code
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>More Examples</CardTitle>
              <CardDescription>Explore comprehensive examples and tutorials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Code className="h-6 w-6" />
                  <div className="font-medium">Advanced Integration</div>
                  <div className="text-sm text-gray-600">Complex payment flows</div>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <ExternalLink className="h-6 w-6" />
                  <div className="font-medium">Sample Applications</div>
                  <div className="text-sm text-gray-600">Full working examples</div>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Github className="h-6 w-6" />
                  <div className="font-medium">GitHub Repository</div>
                  <div className="text-sm text-gray-600">Browse source code</div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SdkResources;
