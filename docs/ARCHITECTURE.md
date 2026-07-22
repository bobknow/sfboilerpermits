# BK3 Platform Architecture

## 1. Platform Purpose

BK3 Platform is a multi-company building operations platform connecting:

- Property management companies
- Boiler and mechanical contractors
- Technicians
- Building owners
- BoilerWatch monitoring devices

The platform manages customers, properties, equipment, permits, service requests,
vendors, BoilerWatch devices, telemetry, alerts, and work orders.

SF Boiler Permits is the first operating company using the platform.

BoilerWatch is the commercial monitoring product offered to contractors,
property managers, and building operators.

---

## 2. Core Products

### SF Boiler Permits

Public-facing lead generation and boiler permit service.

Primary functions:

- Capture permit leads
- Track customers
- Track properties
- Track equipment
- Manage inspections
- Track permits and renewals
- Generate BoilerWatch opportunities

### BoilerWatch

Commercial hardware and SaaS monitoring platform.

Primary functions:

- Monitor boiler and mechanical-room conditions
- Detect equipment outages and abnormal operation
- Notify authorized users
- Create service requests when permitted
- Maintain equipment operating history
- Connect property managers with approved vendors

### BK3 Operations

Internal contractor operations system.

Primary functions:

- Lead management
- Customer management
- Property management
- Equipment records
- Service requests
- Dispatch
- Technician workflow
- Permit tracking
- Reporting

---

## 3. Multi-Company Architecture

Every business record belongs to a tenant.

A tenant may be:

- Contractor
- Property management company
- Building owner
- Facility operator
- White-label partner

Each tenant has isolated:

- Users
- Customers
- Properties
- Equipment
- Devices
- Sensors
- Telemetry
- Alerts
- Service requests
- Vendors
- Settings
- Branding

No tenant may access another tenant's private records.

SF Boiler Permits is the first tenant.

---

## 4. User Roles

### Platform Administrator

Manages the overall BoilerWatch platform.

Permissions:

- Create and manage tenants
- Manage subscription plans
- Review platform health
- Support company accounts
- Manage device provisioning

### Company Owner or Administrator

Manages one tenant account.

Permissions:

- Manage company settings
- Invite users
- Manage properties
- Manage vendors
- Configure alerts
- Configure work-order automation
- View reports

### Property Manager

Manages assigned buildings.

Permissions:

- View properties and equipment
- Receive alerts
- Select preferred vendors
- Approve work orders
- Review service history
- Control automatic work-order settings

### Contractor Dispatcher

Manages service operations.

Permissions:

- Receive service requests
- Assign technicians
- Schedule work
- Update job status
- Communicate with customers

### Technician

Performs field work.

Permissions:

- View assigned jobs
- View equipment information
- Add notes and photos
- Update job status
- Record repairs and readings

### Customer or Building Owner

Limited property access.

Permissions:

- View property condition
- View active alerts
- Review service status
- Request service
- Approve authorized work

---

## 5. Core Data Relationships

```text
Tenant
├── Users
├── Customers
├── Organizations
├── Vendors
├── Properties
│   ├── Equipment
│   │   ├── Permits
│   │   ├── Devices
│   │   │   ├── Sensors
│   │   │   └── Telemetry
│   │   ├── Alerts
│   │   └── Service History
│   ├── Service Requests
│   ├── Documents
│   ├── Photos
│   └── Notes
└── Company Settings