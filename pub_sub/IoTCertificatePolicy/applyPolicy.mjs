import AWS from 'aws-sdk';
import { config } from 'dotenv';
config({ path: '../.env' });

const endpoint = process.env.AWS_ENDPOINT || '';
const regionMatch = endpoint.match(/\.([a-z]{2}-[a-z]+-\d)\./);
const region = regionMatch ? regionMatch[1] : 'us-east-1';

const iot = new AWS.Iot({ region });
async function detachPolicy(policyName) {
  try {
    const principals = await iot.listTargetsForPolicy({ policyName }).promise();

    if (principals.targets.length > 0) {
      console.log(`🔌 Detaching policy '${policyName}' from all principals...`);
      for (const principal of principals.targets) {
        await iot.detachPolicy({ policyName, target: principal }).promise();
        console.log(`✅ Detached policy '${policyName}' from ${principal}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error detaching policy '${policyName}':`, error);
    throw error;
  }
}

async function deletePolicy(policyName) {
  try {
    await detachPolicy(policyName);

    const policyVersions = await iot.listPolicyVersions({ policyName }).promise();
    for (const version of policyVersions.policyVersions) {
      if (!version.isDefaultVersion) {
        await iot.deletePolicyVersion({ policyName, policyVersionId: version.versionId }).promise();
        console.log(`🗑 Deleted policy version: ${version.versionId}`);
      }
    }

    await iot.deletePolicy({ policyName }).promise();
    console.log(`🗑 Policy '${policyName}' deleted.`);
  } catch (error) {
    if (error.code === 'ResourceNotFoundException') {
      console.log(`⚠️ Policy '${policyName}' does not exist, skipping deletion.`);
    } else {
      console.error(`❌ Error deleting policy '${policyName}':`, error);
      throw error;
    }
  }
}

async function createPolicy() {
  const policyName = process.env.IOT_CERTIFICATE_POLICY_NAME || '';
  const policyDocument = process.env.IOT_POLICY_DOCUMENT || '';
  const params = { policyName, policyDocument };

  try {
    await iot.getPolicy({ policyName }).promise();
    console.log(`⚠️ Policy '${policyName}' already exists. Deleting...`);

    await deletePolicy(policyName);
  } catch (error) {
    if (error.code !== 'ResourceNotFoundException') {
      console.error(`❌ Error checking policy:`, error);
      throw error;
    }
  }

  console.log(`🟢 Creating policy: ${policyName}`);
  const policy = await iot.createPolicy(params).promise();
  return policy.policyName;
}

async function getActiveCertificateArn() {
  try {
    const certificates = await iot.listCertificates().promise();
    if (certificates.certificates && certificates.certificates.length > 0) {
      console.log('active cert', certificates.certificates);
      return certificates.certificates[0].certificateArn;
    }
    console.error('❌ No active certificates found.');
    return null;
  } catch (error) {
    console.error('❌ Error fetching certificates:', error);
    throw error;
  }
}

async function attachPolicyToCertificate(policyName, certificateArn) {
  const params = {
    policyName,
    target: certificateArn
  };

  try {
    await iot.attachPolicy(params).promise();
    console.log(`✅ Policy '${policyName}' attached to certificate '${certificateArn}'`);
  } catch (error) {
    console.error(`❌ Error attaching policy:`, error);
  }
}

async function applyPolicy() {
  try {
    const policyName = await createPolicy();
    if (policyName) {
      const certificateArn = await getActiveCertificateArn();
      if (certificateArn) {
        await attachPolicyToCertificate(policyName, certificateArn);
      }
    }
  } catch (error) {
    console.error('❌ Error applying policy:', error);
  }
}

// Run the script
applyPolicy();
// export default applyPolicy;
