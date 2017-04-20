package com.example;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.logging.Logger;
import java.io.IOException;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.codec.binary.Base64;

import com.ibm.mfp.adapter.api.ConfigurationAPI;
import com.ibm.mfp.adapter.api.OAuthSecurity;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.RequestBody;

@Api(value = "@ApiOperation(value = \"Generic method to invoke MFP Analytics APIs\", notes = \"Takes a configuration object as the body param that describes the call to make to the API\")\n" + "\t")
@Path("/callAnalyticsAPI")
public class AnalyticsResource {
	/*
	 * For more info on JAX-RS see
	 * https://jax-rs-spec.java.net/nonav/2.0-rev-a/apidocs/index.html
	 */

	// Define logger (Standard java.util.Logger)
	static Logger logger = Logger.getLogger(AnalyticsResource.class.getName());

	// Inject the MFP configuration API:
	@Context
	ConfigurationAPI configApi;

	/*
	 * Sample of request to bulk mfp analytic Api
	 * Body : {"logs": [{"timestamp": "2017-04-20T11:00:27.366Z","timezone": "60","file": "controller.js","level": "ERROR","line": "234","message": "Something not normal happened.","sourceClass": "string","method": "takePicture","loggerName": "string","pkg": "my.acme.app.gallery2","stacktraceMessage": "An exception occurred.","stacktrace": ["string"],"threadID": "78"}],"appVersion": "2.0 Beta","appName": "New Acme App","appID": "com.ibm.acme2","appVersionCode": "2","deviceID": "618c66913ec337f1","deviceModel": "iPhone7","deviceBrand": "Apple","deviceOS": "iOS","deviceOSversion": "10.0.3"}	 */

	@ApiOperation(value = "Generic method to invoke 'bulk' analytic APIs", notes = "The body is sent directly to the analytic API, after having been processed according to the content type")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/bulk")
	@OAuthSecurity(enabled=false)
	public Response bulk(@HeaderParam("body") String data) {
		try {

			System.err.println("==> Starting /callAnalyticsAPI/bulk processing: data = " + data );

			//String analyticUserPassword = configApi.getPropertyValue("analyticUserPassword");
			String analyticUserId = configApi.getServerJNDIProperty("mfp/mfp.analytics.username");
			String analyticUserPassword = configApi.getServerJNDIProperty("mfp/mfp.analytics.password");
			String analyticUrl = configApi.getServerJNDIProperty("mfp/mfp.analytics.url");


			String authString = analyticUserId + ":" + analyticUserPassword;
			byte[] authEncBytes = Base64.encodeBase64(authString.getBytes());
			String authStringEnc = new String(authEncBytes);

			String applicationAuthentication = "Basic " + authStringEnc;


			okhttp3.Request.Builder requestBuilder = new okhttp3.Request.Builder();
			RequestBody body = null;

			body = (data != null ? RequestBody.create(okhttp3.MediaType.parse("application/json"), data) : null);

			String url = analyticUrl + "/v3/bulk";

			System.err.println("==> Starting /callBinaryAPI/bulk: url = " + url + ", analyticUrl : " + analyticUrl);

			HttpUrl.Builder httpUrlBuilder = HttpUrl.parse(url).newBuilder();
			requestBuilder.url(httpUrlBuilder.build());
			requestBuilder.addHeader("Authorization", applicationAuthentication);
			requestBuilder.addHeader("Content-Type", "application/json");
			requestBuilder.addHeader("Accept", "application/json");
			requestBuilder.addHeader("x-mfp-analytics-api-key", "worklight");
			requestBuilder.post(body);

			System.out.println("==> Request built.");

			OkHttpClient client = new OkHttpClient();
			okhttp3.Response response = client.newCall(requestBuilder.build()).execute();
			System.out.println("==> Response: " + response);
			return Response.status(response.code()).entity(response.body().string()).build();

		} catch (IOException e){
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}


	/*
	 * Sample of request to clientlogs mfp analytic Api
	 * Body : {"logs": [{"timestamp": "2017-04-20T14:15:42.086Z","timezone": "60","file": "Main.swift","level": "ERROR","line": "234","message": "Something normal happened.","sourceClass": "string","method": "takePicture","loggerName": "string","pkg": "my.acme.app.gallery","stacktraceMessage": "An exception occurred.","stacktrace": ["string"],"threadID": "78"}],"appVersion": "2.0 Beta","appName": "IBM Acme App","appID": "com.ibm.acme","appVersionCode": "2","deviceID": "518c66913ec337f0","deviceModel": "iPhone6,2","deviceBrand": "Apple","deviceOS": "iOS","deviceOSversion": "9.2.1"}
	 */

	@ApiOperation(value = "Generic method to invoke 'clientlogs' analytic APIs", notes = "The body is sent directly to the analytic API, after having been processed according to the content type")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/clientlogs")
	@OAuthSecurity(enabled=false)
	public Response clientlogs(@HeaderParam("body") String data) {
		try {

			System.err.println("==> Starting /callAnalyticsAPI/clientlogs processing: data = " + data );

			//String analyticUserPassword = configApi.getPropertyValue("analyticUserPassword");
			String analyticUserId = configApi.getServerJNDIProperty("mfp/mfp.analytics.username");
			String analyticUserPassword = configApi.getServerJNDIProperty("mfp/mfp.analytics.password");
			String analyticUrl = configApi.getServerJNDIProperty("mfp/mfp.analytics.url");


			String authString = analyticUserId + ":" + analyticUserPassword;
			byte[] authEncBytes = Base64.encodeBase64(authString.getBytes());
			String authStringEnc = new String(authEncBytes);

			String applicationAuthentication = "Basic " + authStringEnc;


			okhttp3.Request.Builder requestBuilder = new okhttp3.Request.Builder();
			RequestBody body = null;

			body = (data != null ? RequestBody.create(okhttp3.MediaType.parse("application/json"), data) : null);

			String url = analyticUrl + "/v3/clientlogs";

			System.err.println("==> Starting /callBinaryAPI/clientlogs: url = " + url + ", analyticUrl : " + analyticUrl);

			HttpUrl.Builder httpUrlBuilder = HttpUrl.parse(url).newBuilder();
			requestBuilder.url(httpUrlBuilder.build());
			requestBuilder.addHeader("Authorization", applicationAuthentication);
			requestBuilder.addHeader("Content-Type", "application/json");
			requestBuilder.addHeader("Accept", "application/json");
			requestBuilder.addHeader("x-mfp-analytics-api-key", "worklight");
			requestBuilder.post(body);

			System.out.println("==> Request built.");

			OkHttpClient client = new OkHttpClient();
			okhttp3.Response response = client.newCall(requestBuilder.build()).execute();
			System.out.println("==> Response: " + response);
			return Response.status(response.code()).entity(response.body().string()).build();

		} catch (IOException e){
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}

}